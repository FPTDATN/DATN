import Auth from '../models/auth'

export const getAccountStatistics = async (req, res) => {
    try {
      const tong = await Auth.countDocuments();
      
      return res.status(200).json({
        tong,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  };