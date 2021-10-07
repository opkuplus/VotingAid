// import React, { PureComponent } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";

// export class NewPassword extends PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       status: "Candidate",
//     };
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();

//     const data = {
//       email: this.email,
//     };

//     axios
//       .post("http://localhost:5000/newPassword", data)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={(e) => (this.email = e.target.value)}
//             required
//           />
//           <button type="submit">Uusi salasana</button>
//           <Link
//             to={{
//               pathname: "/login",
//             }}
//           >
//             Takaisin kirjautumissivulle
//           </Link>{" "}
//         </form>
//       </div>
//     );
//   }
// }

// export default NewPassword;
