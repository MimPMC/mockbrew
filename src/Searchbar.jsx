import { Button, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDrinkList } from './Context';

export default function SearchBar() {
  const { addDrink, drinkList } = useDrinkList();
  const [drinks, setDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDrinks, setFilteredDrinks] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'
        );
          setDrinks(response.data.drinks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(searchTerm);
    if (!searchTerm) {
      return setFilteredDrinks(drinks);
    } else {
      setFilteredDrinks(
        drinks.filter((d) => d.strDrink.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  }, [drinks, searchTerm]);

  const handleAddDrink = () => {
    if (searchTerm) {
      const selectedDrink = drinks.find((d) => d.strDrink.toLowerCase() === searchTerm.toLowerCase());
      if (selectedDrink && drinkList.indexOf(selectedDrink) === -1) {
        addDrink(selectedDrink);
      }
       setSearchTerm(''); 
    }
     setSearchTerm(''); 
  };

  return (
    <Stack direction="row" spacing={2} sx={{ padding: '1rem' }}>
      <Autocomplete
        sx={{ width: '100%' }}
        options={filteredDrinks}
        getOptionLabel={(option) => option.strDrink}
        clearOnEscape={true}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a drink"
            variant="outlined"
            placeholder="Search..."
            fullWidth
            onInput={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        )}
         onChange={(event, value) => {
            setSearchTerm(value ? value.strDrink : ''); 
        }}
      />
      <Button variant="contained" onClick={handleAddDrink}>
        Add
      </Button>
    </Stack>
  );
}