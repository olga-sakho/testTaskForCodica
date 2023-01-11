import { Controller } from './controller'
import { Category } from '../models/category_model';
import { Transaction } from '../models/transaction_model'


class CategoryController extends Controller {
    constructor() {
        super()
        this.applyGetCategories(),
        this.applyGetCategoryById(),
        this.applyCreateCategory(),
        this.applyUpdateCategory(),
        this.applyDeleteCategory()
    }

    private applyGetCategories() {
        const path = '/category'
        this.router.get(path, async (request: any, response: any) => {
            try {
                const categories = await Category.getCategories();
                return response.status(200).json(categories)
            } catch (err) {
                return response.status(400).json(err)
            }
        })
    }

    private applyGetCategoryById() {
        const path = '/category/:id'
        this.router.get(path, async (request: any, response: any) => {
            try {
                const category = await Category.getCategoryById(request.params.id)
                if (category) {
                    return response.status(200).json(category)
                } else {
                    return response.status(404).json('Category not found')
                }
            } catch (err) {
                return response.status(400).json(err)
            }
        })
    }

   
    private applyCreateCategory() {
        const path = '/category'
        this.router.post(path, async (request: any, response: any) => {
            try {
                const category = await Category.getCategoryByName(request.body.name)
                if (category) {
                    return response.status(201).json('This category exists.')
                } else {
                    const newCategory = await Category.addCategory(request.body);
                    return response.status(201).json(newCategory)
                }

            } catch (err) {
                return response.status(400).json(err)
            }
        })
    }

    private applyUpdateCategory() {
        const path = '/category/:id'
        this.router.put(path, async (request: any, response: any) => {
            try {
                const category = await Category.getCategoryById(request.params.id)
                if (category) {
                    request.body.id = category.id
                    const updatedCategory = await Category.updateCategory(request.body);
                    return response.status(200).json(updatedCategory)
                } else {
                    return response.status(404).json('Category not found')
                }
            } catch (err) {
                return response.status(400).json(err)
            }
        })
    }

    private applyDeleteCategory() {
        const path = '/category/:id'
        this.router.delete(path, async (request: any, response: any) => {
            try {
                const categoryData = await Category.getCategoryById(request.params.id);
                const transactionsExistInBank = await Transaction.isAnyTransactionsInBank(request.params.id)

                    if(!transactionsExistInBank) {
                       const deleteCategory = await Category.deleteCategory(categoryData.id);
                        return response.status(200).json('Category deleted successfully')
                    } else {
                        return response.status(400).json('There are some transactions in bank');
                    }
            } catch (err) {
                return response.status(400).json(err)
            }
        })

    }

}

export default CategoryController
