<template>
<div id="wrapper">
  <div id="openModalDiv">  
  </div>
  <h1> </h1>
  <b-container class="container">
    <b-modal id="modal-id" title="Create New Recipe" size="l" ok-only>
      <b-form @submit="onSave">
        <b-row>
          <b-col>
            <b-form-group id="input-group-title" label-cols-sm="3" label="Title:" label-for="title" >
              <b-form-input id="title" v-model="form.title" type="text"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-row>
            <b-col >
              <b-form-group id="input-group-vegan " label-for="vegan">
                <input id="vegan" v-model="form.vegan" type="checkbox" />
                <label for="vegan" class="checkboxes">Vegan</label>
              </b-form-group>
            </b-col>
            <b-col >
              <b-form-group id="input-group-vegetarian " label-for="vegetarian">
                <input id="vegetarian" v-model="form.vegetarian" type="checkbox" />
                <label for="vegetarian" class="checkboxes">Vegetarian</label>
              </b-form-group>
            </b-col>
            <b-col >
              <b-form-group id="input-group-glutenFree " label-for="glutenFree">
                <input id="glutenFree" v-model="form.glutenFree" type="checkbox" />
                <label for="glutenFree" class="checkboxes">Gluten Free</label>
              </b-form-group>
            </b-col></b-row>
          </b-col>
        </b-row>
        <b-col cols="4">
          <b-form-group id="input-group-readyInMinutes" label-cols-sm="6" label="Ready In Minutes:" label-for="readyInMinutes" >
            <b-form-input id="readyInMinutes" v-model="form.readyInMinutes" type="number" ></b-form-input>
          </b-form-group>
        </b-col>
        <b-form-group id="input-group-image" label-cols-sm="2" label="Image URL:" label-for="image" >
          <b-form-input id="image" v-model="form.image" type="text"></b-form-input>
        </b-form-group>

        <b-row>
          <b-col cols="2">
              <label>Ingredients:</label>
          </b-col>
          <b-col cols="8">
          </b-col>
          <b-col cols="2" class="btn-add">
            <b-button variant="outline-primary" @click="onAddIngredient">Add Ingredient</b-button>
          </b-col>
        </b-row>
        <ol>
          <li v-for="index in numberOfIng" :key="index" class="copy-row">
              <b-col cols="12">
                <b-row>
                  <b-col cols="5">
                    <b-form-group id="input-group-ingredientName" label-cols-sm="6" label="Ingredient Name:" label-for="ingredientName" >
                      <b-form-input id="ingredientName" type="text" v-model="form.ingredients[index-1].ingredientName"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="4">
                    <b-form-group id="input-group-measuringTool" label-cols-sm="6" label="Measuring Tool:" label-for="measuringTool" >
                      <b-form-input id="measuringTool" type="text" v-model="form.ingredients[index-1].measuringTool"></b-form-input>
                    </b-form-group>
                  </b-col>

                  <b-col cols="2">
                    <b-form-group id="input-group-amount" label-cols-sm="6" label="Amount:" label-for="amount" >
                      <b-form-input id="amount" type="number" v-model="form.ingredients[index-1].amount"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </li>
        </ol>
        <b-row>
          <b-col cols="2">
              <label>Instructions:</label>
          </b-col>
          <b-col cols="8">
          </b-col>
          <b-col cols="2" class="btn-add">
            <b-button variant="outline-primary" @click="onAddInstruction">Add Step</b-button>
          </b-col>
        </b-row>
        <ol>
          <li v-for="index in numberOfInstructions" :key="index" class="copy-row">
            <b-form-input id="instructions" v-model="form.instructions[index-1]" type="text" class="instruction-class"></b-form-input>
          </li>
        </ol>
        <label :class="msgClass">{{msg}}</label>

        <b-button
          type="submit"
          variant="primary"
          class="mx-auto w-100">Save Recipe
        </b-button>
      </b-form>
    </b-modal>
  </b-container>
</div>
  
</template>

<script>
export default {
  data(){
    return{
      form:{
        title: "",
        readyInMinutes: "",
        ingredients: [],
        image: "",
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        instructions: [],
        recipeOwner: ""
      },
    }
  },
  computed: {
    numberOfIng(){
      return this.form.ingredients.length;
    },
    numberOfInstructions(){
      return this.form.instructions.length;
    }
  },
  methods: {
    async onSave(){
      const errors = this.ValidateForm();
      if (errors.length==0){
        try{
          const response = await this.axios.post(this.$root.store.server_domain +"/users/added",this.form);
          this.$router.push("/personal");

          if (response.status !== 201){
            throw "error!";
          }
          else{
            this.msg = "Recipe saved successfully!!"
          }
        }
        catch(error){
        }
      }
    },
    ValidateForm(){
      let errors = [];
      if (this.form.title.trim().length===0)
        errors.push("title");
      if (this.form.readyInMinutes.trim().length===0)
        errors.push("ready in minutes");
      let i = [...this.form.ingredients];
      let count = 0;
      if (this.form.ingredients.length!=0){
        for (let i = 0; i < this.form.ingredients.length; i++){
          if (this.form.ingredients[i].ingredientName.trim().length===0 &&
            this.form.ingredients[i].measuringTool.trim().length===0 &&
            this.form.ingredients[i].amount.trim().length===0){
              i.splice(i,1); 
              continue;
            }
          count+=1;
        }
        this.form.ingredients = i;
        if (this.form.ingredients.length===0){
          errors.push("oh! no ingredients were filled"); 
        }
      }
      let count2 = [...this.form.instructions];
      if (this.form.instructions.length>0){
        for (let i = 0; i < this.form.instructions.length; i++){
          if (this.form.instructions[i].trim().length===0){
            count2.splice(i,1);
            continue; 
          }
        }
        this.form.instructions = count2;
        if (this.form.instructions.length===0){
          errors.push("no instructions were filled"); 
        }
      }
      return errors;
    },
    onAddIngredient(){
      this.form.ingredients.push({ingredientName:"",
                              measuringTool:"",
                              amount:""});
    },
    onAddInstruction(){
      this.form.instructions.push("");
    },
  }
}
</script>


<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); 
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
