import styled from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Auth from "./components/Auth";
import Video from "./pages/Video";
import Channel from "./pages/Channel";
import Register from "./pages/Register";
import History from "./pages/History";
import Search from "./pages/Search";

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&family=Roboto:wght@300&display=swap');
</style>


const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
`;
const Wrapper = styled.div`
  padding: 22px 30px;
`;

function App() {
  return (
    <div>
        <Container>
            <BrowserRouter>
                <Menu/>
                <Main>
                    <Navbar/>
                    <Auth/>
                    <Wrapper>
                        <Routes>
                            <Route path={"/"}>
                                <Route index element={<Home type="random"/>}/>
                                <Route path={"trend"} element={<Home type="trend"/>}/>
                                <Route path={"subscriptions"} element={<Home type="sub"/>}/>
                                <Route path={"/history"} element={<History/>}/>
                                <Route path={"search"} element={<Search/>}/>
                                <Route path="video">
                                    <Route path=":id" element={<Video />} />
                                </Route>
                                <Route path={"channel"}>
                                    <Route path={":id"} element={<Channel/>}/>
                                </Route>
                                <Route path={"/register"} element={<Register/>}/>
                            </Route>
                        </Routes>
                    </Wrapper>
                </Main>
            </BrowserRouter>
        </Container>
    </div>
  );
}

export default App;
