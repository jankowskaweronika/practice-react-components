const root = createRoot(document.querySelector('#root'));

class Article extends React.Component {
    state = {
        comments: [],
        comment: '',
    };

    handleCommentChange = (event) => {
        this.setState({ comment: event.target.value });
    };

    addComment = (event) => {
        event.preventDefault();
        const { comments, comment } = this.state;
        if (comment) {
            this.setState({
                comments: [...comments, comment],
                comment: '',
            });
        }
    };

    render() {
        const { title, body } = this.props;
        return (
            <article>
                <h1>{title}</h1>
                <p>{body}</p>
                <section>
                    <form onSubmit={this.addComment}>
                        <div>
                            <label>
                                <textarea
                                    style={{ minWidth: '300px', minHeight: '120px' }}
                                    name="content"
                                    value={this.state.comment}
                                    onChange={this.handleCommentChange}
                                />
                            </label>
                        </div>
                        <div>
                            <input type="submit" value="dodaj komentarz" />
                        </div>
                    </form>
                    <ul>
                        {this.state.comments.map((comment, index) => (
                            <li key={index}>{comment}</li>
                        ))}
                    </ul>
                </section>
            </article>
        );
    }
}

root.render(
    <Article
        title="Programowanie jest super!"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo ipsum, eleifend vel quam eget, lobortis posuere arcu. In vitae eros in nisi sodales aliquam..."
    />
);