const root = createRoot(document.querySelector('#root'));

class App extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        searchQuery: '',
        users: ['Jan Kowalski', 'Michał Nowak'],
    };

    renderUsersList() {
        const { users, searchQuery } = this.state;
        let userList = users;

        if (searchQuery) {
            userList = users.filter((user) =>
                user.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return userList.map((name) => {
            return <li onClick={this.clickHandler}>{name}</li>;
        });
    }
    handleSearchChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    };
    clickHandler = (e) => {
        const { innerText: userName } = e.target;
        this.removeUser(userName);
    };

    inputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    render() {
        const { firstName, lastName } = this.state;
        return (
            <section onSubmit={this.submitHandler}>
                <form>
                    <input
                        name="firstName"
                        value={firstName}
                        onChange={this.inputChange}
                    />
                    <input name="lastName" value={lastName} onChange={this.inputChange} />
                    <input type="submit" />
                </form>
                <input
                    type="text"
                    placeholder="Wyszukaj użytkownika"
                    onChange={this.handleSearchChange}
                />
                <ul>{this.renderUsersList()}</ul>
            </section>
        );
    }

    submitHandler = (e) => {
        e.preventDefault();

        const { firstName, lastName } = this.state;
        if (firstName && lastName) {
            this.addUser(`${firstName} ${lastName}`);
            this.setState({
                firstName: '',
                lastName: '',
            });
        } else {
        }
    };

    addUser(name) {
        this.setState({
            users: [...this.state.users, name],
        });
    }

    removeUser(name) {
        const currUsers = this.state.users.filter((user) => user != name);

        this.setState({
            users: currUsers,
        });
    }
}

root.render(<App />);
