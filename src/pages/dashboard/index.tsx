import { Container } from "../../components/container";
import { PanelHeader } from "../../components/panelHeader";

export function Dashboard(){
    return(
        <Container>
            <PanelHeader/>
            <h1 className="bg-amber-400">Olá</h1>
        </Container>
    )
}