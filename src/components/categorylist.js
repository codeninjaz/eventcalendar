import React        from 'react';
import _            from 'lodash';
import CategoryItem from './categoryitem';

export default class CategoryList extends React.Component{
    render() {
        let _this = this;
        let listItems = [];
        let n = 0;
        let appstate = this.props.appstate;
        _.each(appstate.categories, function(cat) {
            let isSelected = _.includes(appstate.selectedCategories, cat);
            listItems.push(
                <CategoryItem key={cat + '-' + n} category={cat} selected={isSelected} />
            );
            n += 1;
        });
        return (
            <div className="category-list">
                <span className="category-heading">Kategorier</span>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }

}
