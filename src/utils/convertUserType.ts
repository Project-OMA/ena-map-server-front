export default function convertUserType(type: Number) : String {
  switch(type){
    case 1:
      return "Professor";
    case 2: 
      return "Aluno";
    default:
      return "";
  }
}