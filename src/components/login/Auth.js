import React, { Component } from "react";
import { connect } from "react-redux";
import { login, register } from "../../ducks/reducer";

//import axios from "axios";

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isAdmin: false,
      newUser: false
    };
    // this.register = this.register.bind(this);
    // this.login = this.login.bind(this);
    // this.logout = this.logout.bind(this);
    // this.checkAuth = this.checkAuth.bind(this);
  }
  //   checkAuth(e) {
  //     // of course you should send some request to the server
  //     // and i just simulate it : "admin", "user", "SEO"
  //     console.log(e.target.value);
  //     const { isAdmin } = this.state;
  //     axios.post("/auth/login", { isAdmin }).then(user => {
  //       this.props.updateUser(user.data);
  //       this.setState({ isAdmin: !isAdmin });
  //     });
  //   }

  // getUser() {
  //   axios
  //     .get("/auth/user")
  //     .then(res => {
  //       this.setState({
  //         user: {
  //           ...this.state.user,
  //           user: res.data
  //         }
  //       });
  //     })
  //     .catch(error => alert(error.response.request.response));
  // }

  // authorization() {
  //   if (this.state.user.is_admin === true) {
  //     return <button>Delete</button>;
  //   }
  //   // console.log(this.state.isAdmin);
  //   // if (this.state.isAdmin === !true)
  //   //   return <button className="admin">Admin</button>;
  // }

  // handleUsernameInput(value) {
  //   this.setState({ username: value });
  // }

  // handlePasswordInput(value) {
  //   this.setState({ password: value });
  // }

  // //   toggleAdmin() {
  // //     const { isAdmin } = this.state;
  // //     this.setState({ isAdmin: !isAdmin });
  // //   }

  // login() {
  //   const { username, password } = this.state;
  //   axios
  //     .post("/auth/login", { username, password })
  //     .then(user => {
  //       this.props.updateUser(user.data);
  //       this.setState({ username: "", password: "" });
  //     })
  //     .catch(err => alert(err.response.request.response));
  // }

  // register() {
  //   const { username, password, is_admin } = this.state;
  //   axios
  //     .post("/auth/register", { username, password, is_admin })
  //     .then(user => {
  //       this.setState({ username: "", password: "" });
  //       this.props.updateUser(user.data);
  //     })
  //     .catch(err => {
  //       this.setState({ username: "", password: "" });
  //       alert(err.response.request.response);
  //     });
  // }

  // logout() {
  //   axios
  //     .get("/auth/logout")
  //     .then(() => {
  //       this.props.updateUser({});
  //     })
  //     .catch(err => console.log(err));
  // }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e, username, password) => {
    e.preventDefault();
    if (this.state.newUser) {
      //register method
      this.props.register(username, password);
    } else {
      //login method
      this.props.login(username, password);
    }
    this.setState({ username: "", password: "" });
  };
  render() {
    if (this.props.user.isUser) {
      this.props.history.push("/account");
    }
    const { username, password, newUser } = this.state;
    return (
      <div>
        <h3 onClick={() => this.setState({ newUser: !newUser })}>
          Click to {newUser ? "Login" : "Register"}
        </h3>
        <form
          action=""
          onSubmit={e => this.handleSubmit(e, username, password)}
        >
          <label htmlFor="">username:</label>

          <input
            type="text"
            required
            value={this.state.username}
            placeholder="username"
            name="username"
            onChange={e => this.handleChange(e)}
          />
          <label htmlFor="">password:</label>
          <input
            type="password"
            required
            value={this.state.password}
            placeholder="password"
            name="password"
            onChange={e => this.handleChange(e)}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
//   render() {
//     const { username, password } = this.state;
//     const { user } = this.props;
//     return (
//       <div className="Header">
//         <div className="title">Login Register</div>
//         {user.username ? (
//           <div className="welcomeMessage">
//             <h4>{user.username}, welcome to (give)</h4>
//             <button type="submit" onClick={this.logout}>
//               Logout
//             </button>
//             {/* {this.authorization()} */}
//           </div>
//         ) : (
//           <div className="loginContainer">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={e => this.handleUsernameInput(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={e => this.handlePasswordInput(e.target.value)}
//             />
//             {/* <div className="adminCheck">
//               <input
//                 type="checkbox"
//                 id="adminCheckbox"
//                 onChange={() => this.toggleAdmin()}
//               />{" "}
//               <span> Admin </span>
//             </div> */}
//             <button onClick={this.login}>Log In</button>
//             <button onClick={this.register} id="reg">
//               Register
//             </button>
//             <div />
//           </div>
//         )}
//       </div>
//     );
//   }
// }
const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { login, register }
)(Auth);
