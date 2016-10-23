import firebase from 'firebase';

export const addTodo = (payload) => {
  const { currentUser } = firebase.auth();
  return firebase.database().ref(`/users/${currentUser.uid}/todos/`).push(payload)
}

export const removeTodo = (payload) => {
  const { currentUser } = firebase.auth();
  return firebase.database().ref(`/users/${currentUser.uid}/todos/${payload.uid}`).remove();
}

export const login = (payload) => {
  const {email, password} = payload;
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export const register = (payload) => {
  const {email, password} = payload;
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export const logout = () => {
  return firebase.auth().signOut();
}
