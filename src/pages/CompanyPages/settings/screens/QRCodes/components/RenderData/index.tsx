import BoxQr from "../BoxQr";

const RenderData = ({ arr = [], branch = false }: any) => {
  if (branch) {
    return arr?.map((v: any) => (
      <BoxQr
        key={v.id}
        link={v.dynLink}
        name={v.name}
        id={v.id}
        branch={branch}
      />
    ));
  } else {
    return arr?.map((v: any) => (
      <BoxQr key={v.id} link={v.dynLinkToken} name={v.source} id={v.id} />
    ));
  }
};

export default RenderData;
