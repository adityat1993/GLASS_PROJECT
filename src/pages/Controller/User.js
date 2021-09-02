import axios from 'axios';
import config from './Config';
import React, { useEffect } from 'react'
let googleid = localStorage.getItem(`google`)
let dateid = localStorage.getItem(`date`)

const userdataObject = {

    // for User Registration
    userRegistration: async (data, callback) => {
        axios({
            method: 'POST',
            url: config.baseUrlDatabase + "/user/userId/",
            data: data,
            
        }).then(response => {
            return callback(response),

                console.log("Success", {
                })
        })
            .catch(err => {
                console.log("failed", err);

            });
    },

    // for User Sing Out
    userSignOut: async (data, callback) => {
        axios({
            method: 'POST',
            url: config.baseUrlDatabase + `/user/userId/signOut`,
            data: data
        }).then(response => {
            return callback(response),

                console.log("Success", {
                })
        })
            .catch(err => {
                console.log("failed", err);

            });
    },

    // for get user day data single day

    getusersingleday: async (callback) => {
        axios({
            method: 'GET',
            url: config.baseUrlDatabase + `/day/${googleid}/${dateid}`,
        }).then(response => {
            return callback(response),

                console.log("Success", {
                })
        })
            .catch(err => {
                console.log("failed", err);

            });
    },

    // // for get user day data All data

    getuserAlldata: async (callback) => {
        axios({
            method: 'GET',
            url: config.baseUrlDatabase + `/day/${googleid}`,
        }).then(response => {
            return callback(response),

                console.log("Success", {
                })
        })
            .catch(err => {
                console.log("failed", err);

            });
    },
    // for get acitve routines

    getActiveRoutine: async (callback) => {
        axios({
            method: 'GET',
            url: config.baseUrlDatabase + `/routine/${googleid}`,
        }).then(response => {
            return callback(response),

                console.log("Success", {
                })
        })
            .catch(err => {
                console.log("failed", err);

            });
    },

    // for create routine
    CreateRoutine: async (data, callback) => {
        axios({
            method: 'POST',
            url: config.baseUrlDatabase + "/routine/",
            data: data
        }).then(response => {
            return callback(response),

                console.log("CreateRoutine", {
                })
        })
            .catch(err => {
                console.log("failed", err);

            });
    },
    // for update a routine history. 

    updateRoutineHistory: async (data, callback) => {
        axios({
            method: 'PATCH',
            url: config.baseUrlDatabase + `/routine/history/`,
            data: data
        }).then(response => {
            return callback(response),

                console.log("updateRoutineHistory", {
                })
        })
            .catch(err => {
                console.log("failed", err);

            });
    },

    // // for user remove routine  by its discription 

    removeRoutine: async (data, callback) => {
        axios({
            method: 'DELETE',
            url: config.baseUrlDatabase + `/routine/${googleid}/${data.description}`,
        }).then(response => {
            return callback(response)
        }).catch(err => {
            console.log("failed", err);
            return callback(err)
        });
    },

    // for update the name and DOB 

    updateNameAndDOB: async (data, callback) => {
        axios({
            method: 'PATCH',
            url: config.baseUrlDatabase + `/user/userInfo`,

            data: data
        }).then(response => {
            return callback(response),
                console.log("Success", response);
        })
            .catch(err => {
                console.log("failed", err);

            });
    },

   // for update the user Color

    updateUserColor: async (data, callback) => {
        axios({
            method: 'PATCH',
            url: config.baseUrlDatabase + `/user/userInfo`,

            data: data
        }).then(response => {
            return (response),
                console.log("UserColor", response)

        })
            .catch(err => {
                console.log("failed", err);

            });
    },

    UserInfo1: async (data, callback) => {
        axios({
            method: 'PATCH',
            url: config.baseUrlDatabase + `/user/userInfo`,

            data: data
        }).then(response => {
            return (response),
            console.log("UserInfo1", response),

            console.log("UserInfo", response.data.color)


        })
            .catch(err => {
                console.log("failed", err);

            });
    },
}
export default userdataObject;
