import classes from './MyModule.module.css';

const MyModule = ({ children, visible, setVisible }) => {
  const rootClasses = [classes.MyModuleWindow];

  if (visible) {
    rootClasses.push(classes.active);
  }

  return (
    <div onClick={setVisible} className={rootClasses.join(' ')}>
      <div onClick={(e) => {e.stopPropagation()}} className={classes.MyModuleContent}>
        {children}
      </div>
    </div>
  );
};

export default MyModule;
