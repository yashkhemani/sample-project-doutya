const { default: axios } = require("axios");

const GetAllChallenges = ()=> axios.get('/home/api/getChallenges');

const CreateNewTask = (data)=> axios.post('/home/api/addtask', data);

const CreateNewChallenge = (data)=> axios.post('/home/api/createchallenge', data);

export default {

    GetAllChallenges,
    CreateNewTask,
    CreateNewChallenge

}   