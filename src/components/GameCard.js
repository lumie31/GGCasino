import React, { useRef } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useDrag, useDrop } from "react-dnd";
import CardContent from "@mui/material/CardContent";

import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const GameCard = ({
  img,
  game,
  title,
  index,
  category,
  removeGame,
  moveListItem,
}) => {
  // useDrag - the list item is draggable
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // useDrop - the list item is also a drop area
  // eslint-disable-next-line no-unused-vars
  const [spec, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Join the 2 refs together into one (both draggable and can be dropped on)
  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  // Make items being dragged transparent, so it's easier to see where we drop them
  const opacity = isDragging ? 0 : 1;
  return (
    <Grid item xs>
      <Card
        ref={dragDropRef}
        sx={{ minWidth: 300, borderRadius: "10px", opacity }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            src={img}
            alt="game thumbnail"
          />
          <CardContent sx={{ padding: "12px" }}>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" component="div">
                {title}
              </Typography>
              <IconButton
                aria-label="delete"
                onClick={() => removeGame(game.id)}
              >
                <DeleteIcon />
              </IconButton>
            </span>
            <Typography variant="body2" color="text.secondary">
              {category}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default GameCard;
