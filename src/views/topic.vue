<template>
    <div style="background:#eee;padding: 0 20px">
        <Scroll :on-reach-bottom="handleReachBottom" :height="getClientHeight()">
        <Card dis-hover v-for="(item, index) in list1" :key="index" style="margin: 32px 0">
            <p slot="title">From: {{ item.from }}</p>
            <p>{{ item.inputDecoded }}</p>
        </Card>
    </Scroll>
    </div>
</template>
<script>
import util from '../libs/util'
export default {
    created(){
        document.body.style="background:#eee; height: 100%;"
    },
    data () {
        util.getTopicName(this.$route.params.address).then(data => {
            this.list1 = [
                {
                    from: this.$route.params.address,
                    inputDecoded: util.decodeParameter('string', data.data.result)
                }
            ]
            
            let self = this
            util.getTxlist(this.$route.params.address).then(data => {
                console.log(data)
                let list = data.data.result
                list.forEach(x => {
                    x.inputDecoded = util.hexToUtf8(x.input)
                })
                self.list1 = self.list1.concat(list)
            })
        })
        
        return {
            list1: []
        }
    },
    methods: {
        handleReachBottom () {
            return new Promise(resolve => {
                setTimeout(() => {
                    const last = this.list1[this.list1.length - 1];
                    for (let i = 1; i < 11; i++) {
                        this.list1.push(last + i);
                    }
                    resolve();
                }, 2000);
            });
        },
        getClientHeight () {
            return document.body.offsetWidth
        },
    }
}
</script>
