import {useState, useEffect} from "react";
import {Routes, Route, useParams, useLocation} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColor from "./SingleColor";
import Page from "./Page";
import "../CSS/App.css";
import PaletteForm from "./PaletteForm";

import {generatePalette} from "./colorHelpers";
import seedColors from "./seedColors";

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  const findPalette = (id) => palettes.find((palette) => palette.id === id);

  function deletePalette(id) {
    setPalettes(palettes.filter((palette) => palette.id !== id));
  }
  const PaletteWrapper = () => {
    const {id} = useParams();
    return <Palette palette={generatePalette(findPalette(id))} />;
  };

  const SingleColorWrapper = () => {
    const {paletteId, colorId} = useParams();
    return (
      <SingleColor
        palette={generatePalette(findPalette(paletteId))}
        colorId={colorId}
      />
    );
  };

  const savePalette = (newPalette) => {
    setPalettes(palettes.concat(newPalette));
  };

  useEffect(() => {
    //save palettes to local storage
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  // const {id} = useParams();
  const location = useLocation();
  return (
    <TransitionGroup className="App" location={location}>
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        <Routes location={location}>
          <Route
            index
            path="/"
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                />
              </Page>
            }
          />
          <Route
            path="/palette/:id"
            element={
              <Page>
                <PaletteWrapper />
              </Page>
            }
          />
          <Route
            path="/palette/:paletteId/:colorId"
            element={
              <Page>
                <SingleColorWrapper />
              </Page>
            }
          />
          <Route
            path="/palette/new"
            element={
              <Page>
                <PaletteForm savePalette={savePalette} palettes={palettes} />
              </Page>
            }
          />
          <Route
            path="*"
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                />
              </Page>
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
// <div className="App">
//   <Palette palette={generatePalette(seedColors[3])} />
// </div>
