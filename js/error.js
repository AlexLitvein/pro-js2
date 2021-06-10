Vue.component('myerror', {
    template: `
        <div class="error" v-show="$root.error">
            Нет доступа к серверу.
        </div>
    `
});