 <template>
  <div class="container">
   <LoginAuth /> 


    <div class="row">
      <div class="afterLogin" style="display: none">
        <button type="button"
          class="btn btn-warning pull-left"
          id="createToken"
          data-toggle="modal"
          data-target="#createTokenModal">
          YTT 토큰 발행
        </button>
        <button type="button"
          class="btn btn-warning pull-right"
          id="approve"
          onclick="App.approve()">
          토큰 판매 승인
        </button>
        <button type="button"
          class="btn btn-danger pull-right"
          id="cancelApproval"
          onclick="App.cancelApproval()">
          토큰 판매 승인 취소
        </button>
      </div>
    </div>

    <div class="row">
      <div class="afterLogin" style="display: none;">
        <div id="tabs">
          <ul>
            <li><a href="#myTokens">내 보유 토큰</a></li>
            <li><a href="#myTokensSale">내 판매 중 토큰</a></li>
            <li><a href="#allTokens">모든 토큰</a></li>
          </ul>
          <div id="myTokens"></div>
          <div id="allTokens"></div>
          <div id="myTokensSale"></div>
        </div>
      </div>
    </div>

    <div id="spin"></div>   
  </div>


   
  <!-- Modals -->

  <div class="modal fade" tabindex="-1" role="dialog" id="loginModal">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">         
        <div class="modal-body">
          <div class="form-group">
            <label for="keystore">Keystore</label>
            <input type="file" id="keystore" onchange="App.handleImport()">
          </div>
          <div class="form-group">
            <label for="input-password">비밀번호</label>
            <input type="password" class="form-control" id="input-password" onchange="App.handlePassword()">
            <p class="help-block" id="message"></p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
          <button type="button" class="btn btn-primary" onclick="App.handleLogin()">제출</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->

  <div class="modal fade" tabindex="-1" role="dialog" id="createTokenModal">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">         
        <div class="modal-body">
          <div class="form-group">
            <label for="video-id">비디오 아이디</label>
            <input type="text" class="form-control" id="video-id" onchange="App.checkTokenExists()">
            <p class="help-block" id="t-message"></p>
          </div>         
          <div class="form-group">
            <label for="title">제목</label>
            <input type="text" class="form-control" id="title">           
          </div>   
          <div class="form-group">
            <label for="author">유튜버</label>
            <input type="text" class="form-control" id="author">           
          </div>
          <div class="form-group">
            <label for="date-created">게시일</label>
            <input type="text" class="form-control" id="date-created">           
          </div>         
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
          <button type="button" class="btn btn-primary btn-create" onclick="App.createToken()" disabled>제출</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
 

  <div id="MyTokensTemplate" style="display: none;">
  <div class="col-sm-6 col-md-4 col-lg-3">
    <div class="panel panel-primary">   
      <div class="panel-heading"></div> 
      <div class="panel-body">
        <img style="width: 100%;" src="" title="">
        <br/><br/>
        <strong>영상 ID</strong>: <span class="video-id"></span><br/>
        <strong>유튜버</strong>: <span class="author"></span><br/>
        <strong>게시일</strong>: <span class="date-created"></span><br/>                
      </div>  
      <div class="panel-footer clearfix">         
        <div class="sell-token" style="display: none;">
          <div class="col-sm-6 col-md-8">
            <input type="number" class="form-control amount" step="0.01" min="0" placeholder="KLAY">  
          </div>
          <div class="col-sm-6 col-md-4">
            <button type="button" class="btn btn-default btn-sell" onclick="App.sellToken(this)">판매</button> 
          </div>  
        </div> 
      </div>     
    </div>
  </div>
  </div>

  <div id="AllTokensTemplate" style="display: none;">
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="panel panel-primary">   
        <div class="panel-heading"></div> 
        <div class="panel-body">
          <img style="width: 100%;" src="" title="">
          <br/><br/>
          <strong>영상 ID</strong>: <span class="video-id"></span><br/>
          <strong>유튜버</strong>: <span class="author"></span><br/>
          <strong>게시일</strong>: <span class="date-created"></span><br/>                
        </div>  
        <div class="panel-footer clearfix">         
          <div class="buy-token" style="display: none;">
            <div class="col-sm-6 col-md-8">
              <h5 class="token-price" style="color: green;"></h5>
            </div>
            <div class="col-sm-6 col-md-4">
              <button type="button" class="btn btn-default btn-buy" onclick="App.buyToken(this)">구매</button> 
            </div>  
          </div> 
        </div>     
      </div>
    </div>
  </div>

  <div id="MyTokensSaleTemplate" style="display: none;">
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="panel panel-primary">   
        <div class="panel-heading"></div> 
        <div class="panel-body">
          <img style="width: 100%;" src="" title="">
          <br/><br/>
          <strong>영상 ID</strong>: <span class="video-id"></span><br/>
          <strong>유튜버</strong>: <span class="author"></span><br/>
          <strong>게시일</strong>: <span class="date-created"></span><br/>                
        </div>  
        <div class="panel-footer clearfix">         
          <h5 class="on-sale" style="color:red;"></h5>    
        </div>         
      </div>
    </div>
  </div>

<!-- Templates -->
</template> 


<script>
import { mapGetters } from 'vuex'; 
import LoginAuth from 'components/loginAuth.vue'; 

export default {
  name: 'Shop_NFT',
  components: {
    LoginAuth 
  },

  data() {
    return {
 
    };
  },

  created() { 
  },

  computed: {
 
  },

  methods: {
 
  },
};
</script>

<style>
  @keyframes spinner-line-fade-more {
    0%, 100% {
      opacity: 0;
    }
    1% {
      opacity: 1;
    }
  }

  @keyframes spinner-line-fade-quick {
    0%, 39%, 100% {
      opacity: 0.25;
    }
    40% {
      opacity: 1;
    }
  }

  @keyframes spinner-line-fade-default {
    0%, 100% {
      opacity: 0.22;
    }
    1% {
      opacity: 1;
    }
  }

  .panel-footer {
    height: 56px;   
    overflow: hidden;
  }
</style>


   
