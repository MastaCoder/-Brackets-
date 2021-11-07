import DataContext from '../contexts/dataContext';
import { useContext } from 'react';

const useData = () => {
	return useContext(DataContext);
};

export { useData };
