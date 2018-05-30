<style scoped>
    .index {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
    }

    .index h1 {
        height: 150px;
    }

    .index h1 img {
        height: 100%;
    }

    .index h2 {
        color: #666;
        margin-bottom: 200px;
    }

    .index h2 p {
        margin: 0 0 50px;
    }

    .index .ivu-row-flex {
        height: 100%;
    }
</style>
<!-- <template> -->
<!--     <div class="index"> -->
<!--         <Row type="flex" justify="center" align="middle"> -->
<!--             <Col span="24"> -->
<!--                 <h1> -->
<!--                     <img src="https://raw.githubusercontent.com/iview/iview/master/assets/logo.png"> -->
<!--                 </h1> -->
<!--                 <h2> -->
<!--                     <p>Welcome to your iView app!</p> -->
<!--                     <Button type="ghost" @click="handleStart">Start iView</Button> -->
<!--                 </h2> -->
<!--             </Col> -->
<!--         </Row> -->
<!--     </div> -->
<!-- </template> -->


<template>
    <Scroll :on-reach-bottom="handleReachBottom" :height="getClientHeight()">
        <Card dis-hover v-for="(item, index) in list1" :key="index" style="margin: 32px 0" @click.native="handleItem(item)">
            Content {{ item }}
        </Card>
    </Scroll>
</template>
<script>
export default {
    data () {
        return {
            list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
            return document.body.clientWidth
        },
        handleItem (item) {
            console.log(item)
            this.$router.push({ name: 'topic', params: { address: item }})
        }
    }
}
</script>



<!-- <script> -->
<!--     export default { -->
<!--         methods: { -->
<!--             handleStart() { -->
<!--                 this.$Modal.info({ -->
<!--                     title: 'Bravo', -->
<!--                     content: 'Now, enjoy the convenience of iView.' -->
<!--                 }); -->
<!--             } -->
<!--         } -->
<!--     }; -->
<!-- </script> -->
