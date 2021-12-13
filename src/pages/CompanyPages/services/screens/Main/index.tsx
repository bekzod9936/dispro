//packages

//components
import { Header } from "./components/Header";
import { EmptyPage } from "./components/EmptyPage";

//style
import { Wrapper, Container } from "./style"


interface MainProps {

}

const Main: React.FC<MainProps> = () => {

    return (
        <Wrapper>
            <Header />
            <Container>
                <EmptyPage />
            </Container>
        </Wrapper>
    )
}

export default Main;