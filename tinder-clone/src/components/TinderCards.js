import React, {useEffect, useState} from 'react'
import './TinderCards.css'
import TinderCard from 'react-tinder-card'
import SwipeButtons from './SwipeButtons'
import axios from '../axios'

const TinderCards = () => {

    const [people, setPeople] = useState([])

    //for axios when page loads
    useEffect(() => {
        async function fetchData() {
            const req = await axios.get('/tinder/cards')
            setPeople(req.data)
        }
        fetchData()
    }, [])

    const swiped = (direction, nameToDelete) => {
        console.log("removing: " + nameToDelete);
        // setLastDirection(direction);
    }

    const outOfFrame = (name) => {
        console.log(name + " left the screen!")
    }

  return (
    <div className="tinderCards">
        <div className="tinderCards__cardContainer">
        {
              people.map(person => (
                <TinderCard
                    className='swipe'
                    preventSwipe={['up', 'down']}
                    key={person.id}
                    onSwipe={(dir) => swiped(dir,person.name)}
                    onCardLeftScreen={() => outOfFrame(person.name)}
                >
                    <div 
                        className="card"
                        style={{
                            backgroundImage: `url(${person.imgUrl})`
                        }}
                    >
                        <h3>{person.name}</h3>   
                    </div>
                </TinderCard>
            ))
        }   
        </div>
    </div>
  )
}

export default TinderCards