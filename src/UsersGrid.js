import React, { Component } from 'react';
import User from "./User"


export default class UsersGrid extends Component {

   constructor(props) {
      super(props);
      this.state = {
         loading: true,
         users: [],
       };
   }

   async componentDidMount() {
      const url = "http://localhost:8080/users";
      const response = await fetch(url);
      const userData = await response.json();
      this.setState({
         loading: false,
         users: userData,
      })
    }

   render() {
      return (
         <div >
            {this.state.loading ? 
            <h1>Loading...</h1> : 
            <div>
               {
                 this.state.users.map(user => {
                   return (
                     <User key={user.id} info={user}/>
                   )
                 })
               }
            </div>
            }
         </div>
      );
   }
}
