import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const AnimatedButton = ({ children, to }) => {
  const styles = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 300, friction: 10 },
  });

  return (
    <Link to={to}>
      <animated.button
        style={styles}
        type='submit'
        className='border border-black bg-[#14B8A6] hover:opacity-[0.8] hover:transition-all text-white px-8 py-2'
      >
        {children}
      </animated.button>
    </Link>
  );
};
export default AnimatedButton