const app = new Vue({
    el: '#users',
    
    mounted: function() {
         this.fetchUsers();
    },

    data: {
        users: [],
        nameFilter: ""
    },
    computed: {
        filteredUsers: function () {
            const filterString = this.nameFilter.toLowerCase().trim();
            return !filterString 
                ? this.users
                : this.users
                      .filter(x => x.fullname.toLowerCase().includes(filterString));
        }
    },
    watch: {
        nameFilter: function(val) { console.log(val); }
    },

    methods: {
        fetchUsers: async function() {
            try 
            {
                const users = await UserRepository.getAll();
                this.users = users;
            }
            catch (err)
            {
                console.log("Can't fetch users from server");
            }
        },
        clearFilter: function() {
            this.nameFilter = "";
        },
        createUser: async function(event) {
            event.preventDefault();
            const newUserName = event.target.newUserName.value;
            try 
            {
                const user = await UserRepository.insert(newUserName);
                this.users.push(user);
            }
            catch (err)
            {
                console.log("Can't create user on server");
            }
        },
        removeUser: async function(event) {
            const userId = parseInt(event.target.attributes.user_id.value);
            try 
            {
                await UserRepository.delete(userId);
                this.users.splice(this.users.findIndex(x => x.id === userId), 1);
            }
            catch (err)
            {
                console.log("Can't remove user on server")
            }
        }
    }
 });