import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {axiosWithAuth} from "../utils";
import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get(`http://localhost:5000/api/colors`)
      .then(res => {
        setColorList(res.data);
        console.log('Get ColorList', res.data);
      });
  }, []);
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
