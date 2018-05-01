import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGlobalWordListIfNeeded } from '../../actions/globalWordListActions';
import Loading from '../../styles/Loading';
import GoBack from '../basic/GoBack';


class GlobalWordListPreview extends Component {

    componentDidMount() {
        this.props.fetchGlobalWordListIfNeeded(this.props.match.params.id);
    }

    renderWords(words) {
        let id = 0;
        return words.map(word => {
            id++;
            return <div key={id}>{word}</div>;
        })
    }

    renderLabels(labels) {
        let id = 0;
        return labels.map(label => {
            id++;
            return <div key={id}>{label}</div>;
        });
    }

    render() {
        if(Object.keys(this.props.globalWordLists.preview).length === 0)
            return <Loading />;
        return (
            <div>
                <GoBack goTo='/wordLists' />                
                <div>{this.props.globalWordLists.preview.name}</div>
                { this.renderWords(this.props.globalWordLists.preview.words) }
                <div>
                    { this.renderLabels(this.props.globalWordLists.preview.labels) }
                </div>
            </div>
        )
    }
}

function mapStateToProps({ globalWordLists }) {
    return { globalWordLists };
}

export default connect(mapStateToProps, { fetchGlobalWordListIfNeeded })(GlobalWordListPreview);
