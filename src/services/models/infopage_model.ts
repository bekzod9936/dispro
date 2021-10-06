// To parse this data:
//
//   import { Convert, InfoProps } from "./file";
//
//   const infoProps = Convert.toInfoProps(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface InfoProps {
  categories: number[];
  socialLinks: SocialLink[];
  links: any[];
  images: string[];
  id: number;
  name: string;
  regionId: string;
  qrCode: string;
  annotation: string;
  description: string;
  currencyId: number;
  isHalol: boolean;
  keyWords: string;
  telNumber: string;
  logo: string;
  workingTime: WorkingTime;
  email: string;
  program: null;
  merchantId: string;
  merchantType: number;
  merchantFields: string;
  rating: number;
  status: number;
  companyNewsLimitCount: number;
  type: number;
  disCommission: number;
  hasCoupon: boolean;
  staffId: number;
}

export interface SocialLink {
  name: string;
  value: string;
}

export interface WorkingTime {
  work: Work[];
  aroundTheClock: boolean;
}

export interface Work {
  day: number;
  dayOff: boolean;
  wHours: Hours;
  bHours: Hours;
}

export interface Hours {
  from: string;
  to: To;
}

export enum To {
  The0500 = '05:00',
  The1400 = '14:00',
  The1800 = '18:00',
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toInfoProps(json: string): InfoProps {
    return cast(JSON.parse(json), r('InfoProps'));
  }

  public static infoPropsToJson(value: InfoProps): string {
    return JSON.stringify(uncast(value, r('InfoProps')), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ
      )} but got ${JSON.stringify(val)}`
    );
  }
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`
  );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  InfoProps: o(
    [
      { json: 'data', js: 'data', typ: r('Data') },
      { json: 'error', js: 'error', typ: null },
      { json: 'success', js: 'success', typ: true },
    ],
    false
  ),
  Data: o(
    [
      { json: 'categories', js: 'categories', typ: a(0) },
      { json: 'socialLinks', js: 'socialLinks', typ: a(r('SocialLink')) },
      { json: 'links', js: 'links', typ: a('any') },
      { json: 'images', js: 'images', typ: a('') },
      { json: 'id', js: 'id', typ: 0 },
      { json: 'name', js: 'name', typ: '' },
      { json: 'regionId', js: 'regionId', typ: '' },
      { json: 'qrCode', js: 'qrCode', typ: '' },
      { json: 'annotation', js: 'annotation', typ: '' },
      { json: 'description', js: 'description', typ: '' },
      { json: 'currencyId', js: 'currencyId', typ: 0 },
      { json: 'isHalol', js: 'isHalol', typ: true },
      { json: 'keyWords', js: 'keyWords', typ: '' },
      { json: 'telNumber', js: 'telNumber', typ: '' },
      { json: 'logo', js: 'logo', typ: '' },
      { json: 'workingTime', js: 'workingTime', typ: r('WorkingTime') },
      { json: 'email', js: 'email', typ: '' },
      { json: 'program', js: 'program', typ: null },
      { json: 'merchantId', js: 'merchantId', typ: '' },
      { json: 'merchantType', js: 'merchantType', typ: 0 },
      { json: 'merchantFields', js: 'merchantFields', typ: '' },
      { json: 'rating', js: 'rating', typ: 3.14 },
      { json: 'status', js: 'status', typ: 0 },
      { json: 'companyNewsLimitCount', js: 'companyNewsLimitCount', typ: 0 },
      { json: 'type', js: 'type', typ: 0 },
      { json: 'disCommission', js: 'disCommission', typ: 0 },
      { json: 'hasCoupon', js: 'hasCoupon', typ: true },
      { json: 'staffId', js: 'staffId', typ: 0 },
    ],
    false
  ),
  SocialLink: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'value', js: 'value', typ: '' },
    ],
    false
  ),
  WorkingTime: o(
    [
      { json: 'work', js: 'work', typ: a(r('Work')) },
      { json: 'aroundTheClock', js: 'aroundTheClock', typ: true },
    ],
    false
  ),
  Work: o(
    [
      { json: 'day', js: 'day', typ: 0 },
      { json: 'dayOff', js: 'dayOff', typ: true },
      { json: 'wHours', js: 'wHours', typ: r('Hours') },
      { json: 'bHours', js: 'bHours', typ: r('Hours') },
    ],
    false
  ),
  Hours: o(
    [
      { json: 'from', js: 'from', typ: '' },
      { json: 'to', js: 'to', typ: r('To') },
    ],
    false
  ),
  To: ['05:00', '14:00', '18:00'],
};
