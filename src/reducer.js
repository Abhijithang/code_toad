import produce from 'immer'
import * as actions from './actionLookup'

const initState = {
  order:[],
  products:require('./client/product.json'),
  admin: {
    account:"test",
    password:"test"
  },
  role:"admin",
  course:[
    {
      "id": "5fcd270243a8d7293996b9d7",
      "name": "CSMS 420",
      "description": "Description, properties, and storage allocation functions of data structures including balanced binary trees, B-Trees, hash tables, skiplists, tries, KD-Trees and Quadtrees. Algorithms for manipulating structures. Applications from areas such as String Processing, Computer Graphics, Information Retrieval, Computer Networks, Computer Vision, and Operating Systems.",
      "price": "$10.00",
    }
  ],
  catalog:[],
  assignments:[
    {
      id: '1',
      name: 'assignment1',
      questions: [{q:'test',a:'test'},{q:'test',a:'test'}],
      deadline: '12/31/2023',
      marks: '100pts',
    }
  ]
}

export default function reducer(state=initState, action) {
  console.log(action);
   return produce(state, draft => {
    switch (action.type) {
      case actions.ADD_TO_CART:
        console.log(action);
        let newOrder = action.order
        console.log(newOrder);
        console.log(state.order.filter(order=>order.id != newOrder.id || order.color != newOrder.color));
        draft.order= state.order.filter(order=>order.id !== newOrder.id || order.color !== newOrder.color ||  order.size !== newOrder.size).concat(newOrder)
        break

      case actions.REMOVE_FROM_CART:
        console.log(action);
        let deletedOrder = []

        deletedOrder = deletedOrder.concat(action.order)
        console.log(deletedOrder);
        deletedOrder.map(dorder=> {return draft.order= draft.order.filter(order=>order.id !== dorder.id)})
        // draft.order= state.order.filter(order=>order.id !== deletedOrder.id || order.color !== deletedOrder.color ||  order.size !== deletedOrder.size)
        break

      case actions.BUY_COURSE:
        console.log(action);
        let order = action.order
        let enrolled_list = []
        draft.course.map(course=>{ return enrolled_list.push(course.id)})
        console.log(enrolled_list);
        order = order.filter(({id})=>!enrolled_list.includes(id))
        console.log(order);
        draft.course = draft.course.concat(order)
        draft.order = []
        break

      case actions.CREATE_COURSE:
        console.log(action);
        let newClass = action.course
        draft.course = draft.course.concat(newClass)
        draft.products.catalog = draft.products.catalog.concat(newClass)
        break

      case actions.CRUD_OPERATION:
        console.log(action);
        switch (action.operation) {
          case "delete":
            console.log("delete " + action.target);
            let deleted = []
            deleted = deleted.concat(action.obj)

            deleted.map(dcourse=> {return draft.products.catalog= draft.products.catalog.filter(c=>c.id !== dcourse.id)})
            // draft.products.catalog = draft.products.catalog.filter(course=> course.id !==action.obj)
            break;
          case "update":
            console.log("update " + action.target);
            var foundIndex =  draft.products.catalog.findIndex(course => course.id == action.obj.id);
            console.log(foundIndex)
            draft.products.catalog[foundIndex] = action.obj

            break
          default:
          console.log("no match");


        }
        break

      case actions.UPDATE_CONTACT:
        console.log(action.draft);
        draft.buyer = action.buyer
        break

      default:
        console.log(draft);
        return draft

    }
  })

}
