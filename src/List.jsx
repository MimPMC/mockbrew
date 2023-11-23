/* eslint-disable react/prop-types */
// Import necessary components and modules
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Card, Checkbox, Stack } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { useDrinkList } from "./Context";
import SearchBar from "./Searchbar";

// Function to render each item in the list

// Main component using TransitionGroup for animation
function TransitionGroupExample() {
  const { drinkList, deleteDrink } = useDrinkList();

  // eslint-disable-next-line no-unused-vars
  const [consumedDrinks, setConsumedDrinks] = useState(new Set());

  function handleRemoveDrink(drinkId) {
    deleteDrink(drinkId);
  }

  function handleCheckboxChange(drinkId, checked) {
    setConsumedDrinks((prevConsumedDrinks) => {
      const newConsumedDrinks = new Set(prevConsumedDrinks);
      if (checked) {
        newConsumedDrinks.add(drinkId);
        
      } else {
        newConsumedDrinks.delete(drinkId);
      }
      return newConsumedDrinks;
    });
  }

  function renderItem({ item, isConsumed }) {
    return (
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            title="Delete"
            onClick={() => handleRemoveDrink(item.idDrink)}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Avatar variant="square">
            <img
              src={item.strDrinkThumb}
              alt={item.strDrink}
              style={{ width: "100%", height: "100%" }}
            />
          </Avatar>
          <ListItemText primary={item.strDrink} />
          <Checkbox
            checked={isConsumed}
            onChange={(e) =>
              handleCheckboxChange(item.idDrink, e.target.checked)
            }
            label
          />
        </Stack>
      </ListItem>
    );
  }

  return (
    <Card>
      <SearchBar />
      <List sx={{ mt: 1 }}>
        <TransitionGroup>
          {drinkList.map((drink) => (
            <Collapse key={drink.idDrink}>
              {renderItem({ item: drink })}
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Card>
  );
}

export default TransitionGroupExample;
