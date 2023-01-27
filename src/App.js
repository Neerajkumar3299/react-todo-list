import { useEffect, useState } from 'react';
import Alert from './Component/Alert';
import List from './Component/List';
const getLocalStorage=()=>{
  let list=localStorage.getItem("list");
  if(list){
    return JSON.parse(list);
  }
  else{
    return [];
  }
}
function App() {
  const [item,setItem]=useState("");
  const [list,setList]=useState(getLocalStorage());
  const [isEdit,setIsEdit]=useState(false);
  const [editId,setEditId]=useState();
  const [alert,setAlert]=useState({show:false,msg:"",type:""})
  const handleSubmit=(event)=>{
    event.preventDefault();
    if(!item){
      //
      showAlert(true,"Please enter a valid list","danger")
    }
    else if(item && isEdit){
      const newList=list.map((l)=>{
        if(l.id==editId){
          l.item=item;
        }
        return l;
      })
      showAlert(true,"Edited successfully..","success")
      setList(newList);
      setEditId()
      setIsEdit(false);
      setItem("")
    }
    else{
      const newItem={id:new Date().getTime().toString(),item}
      setList([...list,newItem]);
      showAlert(true,"Item successfully added","success")
      setItem("")
    }
  }
  const showAlert=(show=false,msg="",type="")=>{
    const newAlert={
      show,msg,type
    }
    setAlert(newAlert);
  }
  const editItem=(id)=>{
    setIsEdit(true);
    setEditId(id);
    const getItem=list.find((l)=>{
      if(l.id==id){
        return l;
      }
    })
    setItem(getItem.item);
    console.log(item)
  }
  const deleteItem=(id)=>{
    showAlert(true,"Deleted succesfully..","success")
    const newList=list.filter((l)=>{
      if(l.id!=id){
        return l;
      }
    })
    setList(newList)
  }
  const deleteAll=()=>{
    showAlert(true,"All records deleted successfully..",'success')
    setList([]);
  }

  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list));
  },[list])
  return (
    <>
      <div className="container">
        <section className="section-center">
            {alert.show && <Alert alert={alert} showAlert={showAlert} list={list}/>}
            <h3>Grocery Bud</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="item" id="item" placeholder="e.g. egg" value={item} onChange={(event)=>setItem(event.target.value)} />
              <button className="btn" type="submit">{isEdit?"Edit":"Submit"}</button>
            </form>
            {list.length>0 && <List list={list} deleteItem={deleteItem} deleteAll={deleteAll} editItem={editItem}/>}
        </section>
      </div>
    </>
  );
}

export default App;
