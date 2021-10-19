import { useHistory } from 'react-router-dom'

const Coupons = () => {
    const history = useHistory()

    const handleBack = () => {
        history.goBack()
    }
    return (
        <div>
            <div style={{display: "flex"}}>
                <button onClick={handleBack}>
                    go back
                </button>
                <h4>
                    Создание купона
                </h4>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Coupons