import { useEffect } from 'react'
import { gsap } from 'gsap'
import '../../css/welcome.css'

const Welcome = () => {
    useEffect(() => {
        const leaf = document.querySelector('.leaf-img');
        const bird = document.querySelector('.bird-img');
        const tl = gsap.timeline();

        tl.set(leaf, { x: '-1300' });
        tl.set(bird, { x: '400' });

        tl.to(leaf, { x: '+1300', duration: 3 });

        tl.to(leaf, { x: '0', duration: 1 });
        tl.to(bird, { x: '0', duration: 1, ease: "steps(12)" });

    })
    return (
        <>
            <div className="welcome-section d-none d-lg-flex">
                <img className='leaf-img' src="./assets/leaf.png" alt="Leaf" />
                <img className='bird-img' src="./assets/bird.png" alt="Bird" />
                <h1 className='title'>Plantagram</h1>
            </div>
            <div>
                <div className="welcome-section-sm d-lg-none d-flex">
                    <h1 className='title'>Plantagram</h1>
                    <span className="loader"></span>
                </div>
            </div>
        </>
    )
}

export default Welcome