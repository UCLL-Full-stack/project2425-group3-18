import { Kot } from "../model/kot"
import kotDb from "../repository/kot.db"

const getAllKoten = (): Kot[] => {
    return kotDb.getAllKoten();
}

export default { getAllKoten }