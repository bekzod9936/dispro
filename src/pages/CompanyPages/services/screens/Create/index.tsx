import { Link } from "react-router-dom";

interface CreateProps {

}


const Create: React.FC<CreateProps> = () => {
    return (
        <div>
            <Link to="/services/main">
                back
            </Link>
        </div>
    )
}

export default Create;