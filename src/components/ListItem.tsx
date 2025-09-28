type ListItemProps = {
  item: string;
  children?: React.ReactNode;
};

const ListItem = ({ item,children }: ListItemProps) => (
  <div className="list-item">
    {children || item}
  </div>
);

export default ListItem;