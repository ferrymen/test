import { storiesOf } from '@storybook/vue';
import { linkTo } from '@storybook/addon-links';

import Welcome from './Welcome.vue';

console.log(Welcome)
storiesOf('Welcome', module).add('Welcome', () => ({
  components: { Welcome },
  data: () => {
    return {
      bookData: '',
    };
  },
  template:  '<Welcome :title="bookData.title" :author="bookData.author" :image="bookData.image" :active="true"/>',
}));

