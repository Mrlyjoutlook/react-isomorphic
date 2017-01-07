export default function main(state={},action){
  switch (action.type){
    case 'aa':
    	console.log(new Date().getTime())
      return state.set('text',action.text);
      break;
    default:
      return state;
      break;
  }
}