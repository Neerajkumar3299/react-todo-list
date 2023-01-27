import { AiFillEdit, AiFillDelete } from "react-icons/ai";
function List({ list,deleteItem,deleteAll,editItem }) {
  return (
    <>
      <div className="list">
        {list.map((i) => {
          const { item, id } = i;
          return (
            <div className="single-item" key={id}>
              <p>{item}</p>
              <div className="operation">
                <AiFillEdit id="edit" onClick={()=>editItem(id)}/>
                <AiFillDelete id="delete" onClick={()=>deleteItem(id)}/>
              </div>
            </div>
          );
        })}

        <h4 id="delete-all" onClick={()=>deleteAll()} >delete all</h4>
      </div>
    </>
  );
}
export default List;
