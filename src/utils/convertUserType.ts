export default function convertUserType(type: Number) : String {
  switch(type){
    case 1:
      return "Administrador";
    case 2:
      return "Professor";
    case 3: 
      return "Aluno";
    default:
      return "";
  }
}