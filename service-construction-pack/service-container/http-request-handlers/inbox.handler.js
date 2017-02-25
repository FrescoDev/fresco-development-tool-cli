import Worker from '../../SERVICE_NAME'

class InboxHandler extends BaseHandler {
  index (req, res) {
    let worker = new Worker()
    let response = worker.work(req)
    res.json({
      'res': response
    })
  }
}

export default new InboxHandler()
