import React, { useState, useCallback } from "react";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import GameCard from "./GameCard";
import SlotGames from "../assets/Slot-Games.jpeg";
import CardGames from "../assets/Card-Dice.jpeg";
import CardSuper from "../assets/Card-Gaming.jpeg";
import Casino from "../assets/Casino.jpeg";
import Dice from "../assets/Dice.jpeg";
import RPG from "../assets/RPG.jpeg";

// Todo: State should be managed using Redux
// Dummy Array used to hold test games
const GAMES = [
  { id: 1, img: SlotGames, title: "3D Slots", category: "Slot" },
  { id: 2, img: Casino, title: "Casino Gaming", category: "Casino" },
];

// Get random image from array
const images = [SlotGames, Casino, CardSuper, CardGames, Dice, RPG];
let random = Math.floor(Math.random() * images.length);
let randomImg = images[random];

const categories = [
  {
    value: "Slot",
    id: 1,
  },
  {
    value: "Casino",
    id: 2,
  },
  {
    value: "Card",
    id: 3,
  },
  {
    value: "Poker",
    id: 4,
  },
];

const Dashboard = () => {
  const [games, setGames] = useState(GAMES);
  const [open, setOpen] = useState(false);
  const [gameTitle, setGameTitle] = useState("");
  const [rando, setRando] = useState(randomImg);
  const [category, setCategory] = useState("Slot");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameTitle(event.target.value);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setGameTitle("");
    setCategory("Slot");
    setOpen(false);
  };

  const moveGamesListItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = games[dragIndex];
      const hoverItem = games[hoverIndex];
      // Swap places of dragItem and hoverItem in the games array
      setGames((games) => {
        const updatedGames = [...games];
        updatedGames[dragIndex] = hoverItem;
        updatedGames[hoverIndex] = dragItem;
        return updatedGames;
      });
    },
    [games]
  );

  const addGame = (event: any) => {
    event.preventDefault();
    if (!gameTitle || gameTitle.length === 0) return;
    const newGame = {
      id: Date.now(),
      img: rando,
      title: gameTitle,
      category,
    };
    setGames([...games, newGame]);
    setGameTitle("");
    setCategory("Slot");
    setRando(randomImg);
    setOpen(false);
  };

  const removeGame = (id: any) => {
    // Todo: confirm delete pop up (validation)
    let filteredGames = games.filter((game) => game.id !== id);
    setGames(filteredGames);
  };
  return (
    <Container maxWidth="lg" sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Fab color="primary" aria-label="add" onClick={handleModalOpen}>
        <AddIcon />
      </Fab>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {games.length === 0 ? (
          <Box
            sx={{ marginTop: "10vh", fontSize: "1.5rem", textAlign: "center" }}
          >
            <strong>
              <p>No Games Available!</p>
              <p>Click the Blue button above to add a new game</p>
            </strong>
          </Box>
        ) : (
          games.map((game, index) => (
            <GameCard
              key={game.id}
              img={game.img}
              title={game.title}
              category={game.category}
              index={index}
              moveListItem={moveGamesListItem}
              removeGame={removeGame}
              game={game}
            />
          ))
        )}
      </Grid>
      <Dialog open={open} onClose={handleModalClose}>
        <DialogTitle>Add New Game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Use the form below to add a new game!
          </DialogContentText>
          <TextField
            size="small"
            autoFocus
            margin="dense"
            id="title"
            label="Game Title"
            value={gameTitle}
            onChange={handleInputChange}
            type="text"
            fullWidth
            required
          />
          <TextField
            size="small"
            select
            margin="dense"
            id="category"
            label="Game Category"
            value={category}
            onChange={handleChange}
            placeholder="Select Category"
            SelectProps={{
              native: true,
            }}
            fullWidth
          >
            {categories.map((option) => (
              <option key={option.id} value={option.value}>
                {option.value}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={addGame}>Add Game</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
