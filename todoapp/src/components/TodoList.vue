<template>
  <h3>To do List</h3>
  <div class="taskInsertionForm">
    <div>
      <span>
        <p>Subject:</p>
      </span>
      <span>
        <input type="text" v-model="subject" />
      </span>
    </div>
    <div>
      <span>
        <p>Description:</p>
      </span>
      <span>
        <input type="text" v-model="description" />
      </span>
    </div>
    <div>
      <span>
        <p>Time:</p>
      </span>
      <span>
        <input type="time" v-model="time" />
      </span>
    </div>
    <div>
      <span>
        <p>Date:</p>
      </span>
      <span>
        <input type="date" v-model="date" />
      </span>
    </div>
    <span>
      <button class="insertTaskButton" v-on:click="Insert()">
        Insert Task
      </button>
    </span>
    <span>
      <button class="updateTaskButton" v-on:click="SelectAndUpdate()">
        Update Task
      </button>
    </span>
    <span>
      <button class="deleteTaskButton" v-on:click="SelectAndDelete()">
        Delete Task
      </button>
    </span>
  </div>

  <span class="zero">
    <div class="hero">
      <ul v-for="(task, Index) in users" v-bind:key="task.id">
        <li
          @click="
            Selected(
              Index,
              task.id,
              task.subject,
              task.description,
              task.time,
              task.date
            )
          "
        >
          {{ Index + 1 }}) {{ task.subject }}
        </li>
      </ul>
    </div>

    <div class="taskDetails">
      <ul>
        <li>Task Name {{ this.selectedItem.subject }}</li>
        <li>Details {{ this.selectedItem.description }}</li>
        <li>Time {{ this.selectedItem.time }}</li>
        <li>Date {{ this.selectedItem.date }}</li>
      </ul>
    </div>
  </span>
</template>

<script>
// import axios from "axios";

export default {
  name: "TodoList",
  data() {
    return {
      users: list,
      subject: "",
      description: "",
      time: "",
      date: "",
      selectedIndex: -1,
      selectedItem: {
        id: 0,
        subject: "",
        description: "",
        time: "",
        date: "",
      },
    };
  },
  methods: {
    Insert: function () {
      let newTask = {
        id: list.length + 1,
        subject: this.subject,
        description: this.description,
        time: this.time,
        date: this.date,
      };
      if (this.subject == "") {
        window.alert("Cant add while having empty slots. ");
        return;
      }
      window.alert("Task added " + this.subject);
      this.users.push(newTask);
      this.subject = "";
      this.description = "";
      this.date = null;
      this.time = null;
    },
    Selected: function (index, cid, csubject, cdescription, ctime, cdate) {
      this.selectedIndex = index;
      this.selectedItem.id = cid;
      this.selectedItem.subject = csubject;
      this.selectedItem.description = cdescription;
      this.selectedItem.time = ctime;
      this.selectedItem.date = cdate;
    },
    SelectAndDelete: function () {
      if (this.selectedIndex == -1) {
        window.alert("Please select an item to delete.");
        return;
      }
      console.log("Select and delete func");
      this.users.splice(this.selectedIndex, 1);
      console.log("deleted");
      // window.alert(list.indexOf(item));
    },
    SelectAndUpdate: function () {
      if (this.selectedIndex == -1) {
        window.alert("Please select an item to Update.");
        return;
      }
      if (this.subject == "") {
        window.alert("Cant Update while having empty slots. ");
        return;
      }
      let item = {
        id: this.selectedIndex+1,
        subject: this.subject,
        description: this.description,
        time: this.time,
        date: this.date,id: 1,
      };
      this.users.splice(this.selectedIndex, 1, item);
      console.log("Updated");
      // window.alert(list.indexOf(item));
    },
  },
  //   created: function () {
  //     axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
  //       this.users = res.data;
  //       window.alert("hello");
  //     });
  //   },
};

var list = [
  {
    id: 1,
    subject: "alpha",
    description: "going and then coming",
    time: "12:00",
    date: "25-05-2000",
  },
  {
    id: 2,
    subject: "beta",
    description: "not going and then coming",
    time: "8:00",
    date: "25-05-2010",
  },
  {
    id: 3,
    subject: "gama",
    description: "going and then coming",
    time: "20:00",
    date: "25-05-2020",
  },
];
</script>

<style>
.taskInsertionForm > div > span {
  display: inline-block;
  text-align: left;
  width: 150px;
  font-weight: bold;
}
.hero {
  width: 30%;
  margin: 3% 10% 3% 10%;
}
.zero {
  display: flex;
  flex-wrap: wrap;
}
.insertTaskButton {
  padding: 10px 20px 10px 20px;
  background-color: aquamarine;
  border: green 1px solid;
}
.insertTaskButton:hover {
  border: rgb(143, 151, 143) 1px solid;
}
.updateTaskButton {
  padding: 10px 20px 10px 20px;
  background-color: rgb(221, 231, 73);
  border: rgb(88, 88, 82) 1px solid;
  margin: 10px;
}
.updateTaskButton:hover {
  border: rgb(143, 151, 143) 1px solid;
}
.deleteTaskButton {
  padding: 10px 20px 10px 20px;
  background-color: rgb(231, 73, 73);
  border: rgb(43, 43, 41) 1px solid;
}
.deleteTaskButton:hover {
  border: rgb(143, 151, 143) 1px solid;
}
.hero > ul {
  list-style-type: none;
  align-self: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  text-align: left;
  background-color: rgb(0, 168, 84);
  cursor: pointer;
}
.hero > ul > li {
  color: rgb(255, 255, 255);
  display: inline-block;
  width: 100%;
  padding: 10px;
  font-size: 18px;
  margin-right: 10px;
}
.taskDetails ul {
  list-style: none;
  padding: 10px;
  background-color: aqua;
  text-align: left;
}
</style>