import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    label: {
        fontSize: 16,
        color: '#223367',
        lineHeight: 18.75
    },
    root: {
        transition: '200ms all'
    },
    icon: {
        width: 20,
        height: 20,
        border: '2px solid #A5A5A5',
        borderRadius: '50%',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
          },
    },
     checkedIcon: {
        transition: '200ms all',
         borderColor: '#3492FF',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         '&:before': {
             display: 'block',
             width: 10,
             height: 10,
             borderRadius: '50%',
             backgroundColor: '#3492FF',
             content: '""',
             transition: '200ms all'
         }
     },
    
})