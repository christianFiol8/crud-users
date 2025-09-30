type ListContainerProps = {
  children ?: React.ReactNode;
}

function ListContainer({children} : ListContainerProps){
    return(
      <ul className="list-container">
        {children}
      </ul>
    );
} ;

export default ListContainer;