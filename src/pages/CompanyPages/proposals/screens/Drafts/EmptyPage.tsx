import {ReactComponent as EmptyPageImg} from 'assets/images/ProposalsEmptyPage.svg'
export const EmptyPage = () => {
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <EmptyPageImg />
            <p style={{fontSize: "18px", lineHeight: "150%", color: "#223367", marginTop: "30px"}}>Тут будут находиться ваши спецпредложения</p>
        </div>
    )
}
