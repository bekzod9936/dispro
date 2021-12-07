export const customStyle = (props: any) => ({
  menuPortal: (base: any) => ({ ...base, zIndex: 999999 ,}),
  menuList:(base:any)=>({
    ...base,
    minHeight: 50,
  
    maxHeight:props.isBranchHeight ? 100:1000,
  }),
  control: (base: any, state: any) => ({
    ...base,

    border: props.error
      ? "1px solid #FF5E68"
      : props.selectStyle?.border
      ? props.selectStyle?.border
      : "1px solid #C2C2C2",
   
    boxShadow: "none",
    "&:hover": {
      border: "inherite",
    },
    borderBottom: props.selectStyle?.borderbottom
      ? props.selectStyle?.borderbottom
      : null,
    backgroundColor: props.selectStyle?.bgcolor
      ? props.selectStyle?.bgcolor
      : "white",
    borderRadius:
      props.selectStyle?.radius === 0
        ? 0
        : props.selectStyle?.radius
        ? `${props.selectStyle?.radius}px`
        : "14px",
  }),
  option: (base: any, state: any) => {
    return {
      ...base,  
    

      color: props.selectStyle?.color ? props.selectStyle?.color : "#223367",
      fontWeight: props.selectStyle?.weight ? props.selectStyle?.weight : "500",
      backgroundColor: state.isSelected ? "#E8F0FE" : "white",
    };
  },
});
