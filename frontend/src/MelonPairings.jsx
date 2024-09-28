/* Fetch images of melon pairings */
import { useState, useCallback } from 'react';

/* React Bootstrap Components */
import { Card, Button } from 'react-bootstrap';

/* Asset Images */
import mainPic from './assets/mainPic.png'
import melonPic from './assets/melonPic.png'
import cantaloupe from './assets/cantaloupe.png'
import honeydew from './assets/honeydew.png'
import prosciuttoCantaBasil from './assets/prosciuttoCantaBasil.png'
import watermelonWaffles from './assets/watermelonWaffles.png'
import allMelons from './assets/allMelons.png'


export default function MelonPairings() {
    const melonImages = [mainPic, melonPic, cantaloupe, honeydew, prosciuttoCantaBasil, watermelonWaffles, allMelons];
    const [melonImage, setMelonImage] = useState(mainPic);

    const generateNewMelonPairing = useCallback(() => {
        const newImg = melonImages[Math.floor(Math.random() * melonImages.length)];
        setMelonImage(newImg);
    }, [melonImages]);

    return (
        <div className='melonContainer'>
        <Card>
          <Card.Img
            className="melonCard"
            variant="top"
            src={melonImage}
            alt="Melon Pairing"
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>Examples of Melon Pairings</Card.Title>
            <Button
              className='genBtn'
              variant="primary"
              onClick={generateNewMelonPairing}
            >
              Click here
            </Button>
          </Card.Body>
        </Card>
        </div>
      );
}
