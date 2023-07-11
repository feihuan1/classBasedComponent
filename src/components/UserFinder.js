import { Fragment, useState, useEffect, Component } from "react";

import ErrorBoundary from "./ErrorBoundary"
import Users from "./Users";
import classes from "./UserFinder.module.css";
import UsersContext from "../store/users-context";


class UserFinder extends Component {
    static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers:[],
      searchTerm: "",
    };
  }

  //loading when first mount, like useEffect with no dependencies
  componentDidMount() {
    //maby fetch datafrom API
    this.setState({ filteredUsers: this.context.users })
  }

  //run when searchterm changes, like useEffect with dependencies
  componentDidUpdate(prevProps, prevState) {
    if(prevState.searchTerm !== this.state.searchTerm){
        this.setState({
            filteredUsers: this.context.users.filter((user) =>
              user.name.includes(this.state.searchTerm)
            ),
          });
    }
  }

  searchChangeHandler(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
        <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
