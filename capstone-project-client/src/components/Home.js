import React from 'react'
import Button from 'react-bootstrap/Button';
// import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import QuizE from './QuizE';
import QuizH from './QuizH';
import QuizM from './QuizM';
//We need the logic for the following: give each button an id that is the same as the level it represents. Onclick function to trigger based on which id was selected, so that all questions do not show at once. This component can only be accessed by typing /home after localhost:3000. It is not connected to the nav bar?

const Home = () => {

    // const navigate = useNavigate();
    const [isShown, setIsShown] = useState(false);
    const [isShown1, setIsShown1] = useState(false);
    const [isShown2, setIsShown2] = useState(false);


    const handleClick = event => {
        setIsShown(current => !current);
     
      };

      const handleClick1 = event => {
        setIsShown1(current => !current);
     
      };

      const handleClick2 = event => {
        setIsShown2(current => !current);
     
      };

  return (
    <div>

    <Button onClick={handleClick}>Easy</Button>
    {isShown && (
        <div>
          <QuizE />
        </div>
      )}
      {isShown && <Box />}


    


    <Button onClick={handleClick1}>Medium</Button>
        {isShown1 && (
            <div>
                <QuizM />
            </div>
        )}
        {isShown1 && <Box />}
        





    <Button onClick={handleClick2}>Hard</Button>
            {isShown2 && (
                <div>
                    <QuizH />
                </div>
            
            )}
        {isShown2 && <Box />}

    </div>
  )
}

function Box() { 
    return (
      <div>
        <h2>Quiz Time!!</h2>
      </div>
    );
  }

export default Home